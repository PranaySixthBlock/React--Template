


export default {
  items: [
      {
      name : 'Dashboard',
      icon : 'fa fa-dashboard'
      },
    	{
      name: 'User Management',
      url: '/users',
      icon: 'fa fa-building-o',
      children: [
        {
          name : 'Users',
          url : '/users',
          icon: 'fa fa-building-o',
        },
        {
          name : 'Roles/Permissions',
          url : '/role',
          icon: 'fa fa-building-o',
        }
      ]

    },
    {
      name : 'Tender',
      icon : 'fa fa-gavel',
      url : '/tenderCreation'
    },
    {
      name : 'settings',
      icon : 'fa fa-gear',
      children : [
        {
          name : 'Location',
          icon : 'fa fa-gear',
        },
        {
          name : 'company settings',
          icon : 'fa fa-gear',
        },
      ]
    },
    {
      name : 'dropdowns',
      icon : 'fa fa-map-marker',
      children : [
        {
          name : 'Tender Category',
          icon : 'fa fa-map-marker',
          url : '/tender',
        },
        {
          name : 'Department',
          icon : 'fa fa-map-marker',
          url : '/department',
        },
        {
          name : 'Country',
          icon : 'fa fa-map-marker',
          url : '/country',
        },
        {
          name : 'State',
          icon : 'fa fa-map-marker',
          url : '/state',
        },
        {
          name : 'City',
          icon : 'fa fa-map-marker',
          url : '/city',
        },
      ]
    }
  

  //    {
  //     name: 'Administration',
  //     url: '/administration',
  //     icon: 'cui-screen-desktop',
  //     children: [
  //       {
  //         name: 'Dropdowns',
  //         url: '/administration/dropdowns',
  //         icon: 'cui-chevron-bottom'
  //       },
  //       {
  //         name: 'Users',
  //         url: '/administration/users',
  //         icon: 'fa fa-users'
  //       },
  //       {
  //         name: 'Roles',
  //         url: '/administration/roles',
  //         icon: 'fa fa-cog'
  //       },
  //     ]
  //   },
    
  //   {
  //     name: 'Skill Templates',
  //     url: '/skilltemplates',
  //     icon: 'fa fa-feed',
  //   },
  //   {
  //     name: 'Voice Skills',
  //     url: '/voiceskills',
  //     icon: 'fa fa-feed',
  //   },
  //   {
  //     name: 'Reports',
  //     url: '/reports',
  //     icon: 'fa fa-file',
  //     children: [
  //       {
  //         name: 'Activity Log',
  //         url: '/reports/activitylog',
  //         icon: 'fa fa-history'
  //       },
  //     ]
  //   },
  ]
};
