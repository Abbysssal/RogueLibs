﻿using System;
using System.Linq;
using System.Reflection;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using BepInEx.Logging;

namespace RogueLibsCore
{
	/// <summary>
	///   <para>Represents an event handler, subscribed to an instance of the <see cref="RogueEvent{T}"/> type.</para>
	/// </summary>
	/// <typeparam name="T">Type of <see cref="RogueEventArgs"/> used by the event handler.</typeparam>
	public sealed class RogueEventSubscriber<T> : IComparable<RogueEventSubscriber<T>> where T : RogueEventArgs
	{
		internal RogueEventSubscriber(RogueEventHandler<T> handler, string name, string[] before, string[] after)
		{
			Handler = handler;
			if (name != null) Name = name;
			else
			{
				Name = GetAutoName();
				AutoName = true;
			}
			_before = new string[before?.Length ?? 0];
			before?.CopyTo(_before, 0);
			Before = new ReadOnlyCollection<string>(_before);
			_after = new string[after?.Length ?? 0];
			after?.CopyTo(_after, 0);
			After = new ReadOnlyCollection<string>(_after);
		}

		/// <summary>
		///   <para>Gets the subscriber's event handler.</para>
		/// </summary>
		public RogueEventHandler<T> Handler { get; }

		private string GetAutoName()
		{
			MethodInfo method = Handler.Method;
			return method.DeclaringType.FullName + "." + method.Name;
		}
		/// <summary>
		///   <para>Gets the subscriber's name/id.</para>
		/// </summary>
		public string Name { get; }
		/// <summary>
		///   <para>Determines whether the subscriber's name was automatically generated.</para>
		/// </summary>
		public bool AutoName { get; }

		private readonly string[] _before;
		/// <summary>
		///   <para>Collection of subscriber names, that the current subscriber will be invoked prior to.</para>
		/// </summary>
		public ReadOnlyCollection<string> Before { get; }
		private readonly string[] _after;
		/// <summary>
		///   <para>Collection of subscriber names, that the current subscriber will be invoked after.</para>
		/// </summary>
		public ReadOnlyCollection<string> After { get; }

		/// <summary>
		///   <para>Compares the current subscriber with the specified <paramref name="subscriber"/> and returns an integer, indicating their position in the invokation list relative to each other.</para>
		/// </summary>
		/// <param name="subscriber">Other <see cref="RogueEventSubscriber{T}"/>.</param>
		/// <returns>Integer, indicating the position of the current subscriber, relative to the specified <paramref name="subscriber"/>.</returns>
		/// <exception cref="ArgumentNullException"><paramref name="subscriber"/> is <see langword="null"/>.</exception>
		public int CompareTo(RogueEventSubscriber<T> subscriber)
			=> subscriber is null ? throw new ArgumentNullException(nameof(subscriber))
			: !(_before is null) && Array.IndexOf(_before, subscriber.Name) != -1 ? -1
			: !(_after is null) && Array.IndexOf(_after, subscriber.Name) != -1 ? 1
			: 0;
		/// <summary>
		///   <para>Returns the string representation of the subscriber.</para>
		/// </summary>
		/// <returns>String representation of the subscriber.</returns>
		public override string ToString() => Name + (AutoName ? null : $" ({GetAutoName()})");
	}
	/// <summary>
	///   <para>Event handler that uses the specified <typeparamref name="T"/> <see cref="RogueEventArgs"/>.</para>
	/// </summary>
	/// <typeparam name="T">Type of the <see cref="RogueEventArgs"/> to use.</typeparam>
	/// <param name="args">Container with the event data.</param>
	public delegate void RogueEventHandler<in T>(T args) where T : RogueEventArgs;
}