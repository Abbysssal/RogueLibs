module.exports = {
  documentationSidebar: [
    'intro',
    {
      'User\'s Guide': [
        'user/installation',
        'user/troubleshooting',
      ],
      'Developer\'s Guide': [
        {
          type: 'category',
          label: 'Introduction',
          collapsed: false,
          items: [
            'dev-intro/setup',
            'dev-intro/names',
            'dev-intro/sprites',
            'dev-intro/patching',
            'dev-intro/other',
          ],
        },
        {
          'Custom Items': [
            'dev-items/create-item',
            'dev-items/usable-items',
            'dev-items/combinable-items',
            `dev-items/inventory-events`,
          ],
          'Custom Traits': [
            'dev-traits/create-trait',
          ],
          'Custom Unlocks': [

          ],
        },
      ],
    },
  ],
};
