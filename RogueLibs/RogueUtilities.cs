﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using UnityEngine;

namespace RogueLibsCore
{
	/// <summary>
	///   <para>Collection of some useful functions, that you might need.</para>
	/// </summary>
	public static class RogueUtilities
	{
		/// <summary>
		///   <para>Converts a .png or .jpg file into a <see cref="Sprite"/>.</para>
		/// </summary>
		public static Sprite ConvertToSprite(string filePath)
		{
			byte[] data = null;
			try
			{
				data = File.ReadAllBytes(Path.GetFullPath(filePath));
			}
			catch (Exception e)
			{
				RogueLibs.PluginInstance.LogError("Could not load Sprite from \"" + filePath + "\"!", e);
			}
			return ConvertToSprite(data, 64);
		}
		/// <summary>
		///   <para>Converts a .png or .jpg file into a <see cref="Sprite"/> with the specified pixel-per-unit value (default - 64).</para>
		/// </summary>
		public static Sprite ConvertToSprite(string filePath, int ppu)
		{
			byte[] data = null;
			try
			{
				data = File.ReadAllBytes(Path.GetFullPath(filePath));
			}
			catch (Exception e)
			{
				RogueLibs.PluginInstance.LogError("Could not load Sprite from \"" + filePath + "\"!", e);
			}
			return ConvertToSprite(data, ppu);
		}
		/// <summary>
		///   <para>Converts a .png or .jpg byte array into a <see cref="Sprite"/>.</para>
		/// </summary>
		public static Sprite ConvertToSprite(byte[] data) => ConvertToSprite(data, 64);
		/// <summary>
		///   <para>Converts a .png or .jpg byte array into a <see cref="Sprite"/> with the specified pixel-per-unit value (default - 64).</para>
		/// </summary>
		public static Sprite ConvertToSprite(byte[] data, int ppu)
		{
			Sprite sprite = null;
			try
			{
				Texture2D texture = new Texture2D(14, 6);
				texture.LoadImage(data);
				sprite = Sprite.Create(texture, new Rect(0, 0, texture.width, texture.height), Vector2.zero, ppu);
			}
			catch (Exception e)
			{
				RogueLibs.PluginInstance.LogError("Could not load Sprite from an array of bytes!", e);
			}
			return sprite;
		}

		/// <summary>
		///   <para>Converts a .mp3, .ogg, .wav or .aiff (it is recommended to use .ogg, since other formats might not load properly) file into an <see cref="AudioClip"/>.</para>
		/// </summary>
		public static AudioClip ConvertToAudioClip(string filePath)
		{
			string path = Path.GetFullPath(filePath);
			AudioClip clip = null;
			AudioType type;
			switch (Path.GetExtension(path).ToLower())
			{
				case ".mp3":
					type = AudioType.MPEG; break;
				case ".ogg":
					type = AudioType.OGGVORBIS; break;
				case ".wav":
					type = AudioType.WAV; break;
				case ".aiff":
					type = AudioType.AIFF; break;
				default:
					type = AudioType.UNKNOWN; break;
			}
			try
			{
				UnityWebRequest request = UnityWebRequestMultimedia.GetAudioClip("file:///" + path, type);
				request.SendWebRequest();
				clip = DownloadHandlerAudioClip.GetContent(request);
			}
			catch (Exception e)
			{
				RogueLibs.PluginInstance.LogError("Could not load AudioClip from \"" + path + "\"!", e);
			}
			return clip;
		}

		/// <summary>
		///   <para>Conflicts all <see cref="CustomUnlock"/>s in the <paramref name="customUnlocks"/> with each other.</para>
		/// </summary>
		public static void CrossConflict(params CustomUnlock[] customUnlocks)
		{
			foreach (CustomUnlock unlock in customUnlocks)
				unlock.AddConflicting(customUnlocks);
		}
		/// <summary>
		///   <para>Conflicts each <see cref="CustomUnlock"/> in the <paramref name="customUnlocks"/> with each <see cref="Unlock"/> in the <paramref name="unlocks"/>.</para>
		/// </summary>
		public static void EachConflict(IEnumerable<string> unlocks, params CustomUnlock[] customUnlocks)
		{
			string[] list2 = unlocks.ToArray();
			foreach (CustomUnlock unlock in customUnlocks)
				unlock.AddConflicting(list2);
		}
		/// <summary>
		///   <para>Conflicts each <see cref="CustomUnlock"/> in the <paramref name="customUnlocks"/> with each <see cref="Unlock"/> in the <paramref name="unlocks"/>.</para>
		/// </summary>
		public static void EachConflict(IEnumerable<CustomUnlock> customUnlocks, params string[] unlocks)
		{
			foreach (CustomUnlock unlock in customUnlocks)
				unlock.AddConflicting(unlocks);
		}

	}
}
