import { Hospital } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail
} from '@/components/ui/sidebar';
import { Link } from 'react-router';

// This is sample data.
const data = {
  navMain: [
    // {
    //   title: 'Getting Started',
    //   url: '#',
    //   items: [
    //     {
    //       title: 'Installation',
    //       url: '#'
    //     },
    //     {
    //       title: 'Project Structure',
    //       url: '#'
    //     }
    //   ]
    // },
    {
      title: 'Dashboard Management',
      url: '#',
      items: [
        {
          title: 'Patient Information',
          url: 'patient-information'
        },
        {
          title: 'Patient Search',
          url: 'patient-search'
        },
        {
          title: 'Appointments',
          url: 'appointments',
        },
        {
          title: 'Doctor Approval',
          url: 'doctor-approval'
        },
        {
          title: 'Emergency Ambulance',
          url: 'emergency-ambulance'
        },
        {
          title: 'Report Delivery',
          url: 'report-delivery'
        }
        // {
        //   title: 'Optimizing',
        //   url: '#'
        // },
        // {
        //   title: 'Configuring',
        //   url: '#'
        // },
        // {
        //   title: 'Testing',
        //   url: '#'
        // },
        // {
        //   title: 'Authentication',
        //   url: '#'
        // },
        // {
        //   title: 'Deploying',
        //   url: '#'
        // },
        // {
        //   title: 'Upgrading',
        //   url: '#'
        // },
        // {
        //   title: 'Examples',
        //   url: '#'
        // }
      ]
    }
    // {
    //   title: 'API Reference',
    //   url: '#',
    //   items: [
    //     {
    //       title: 'Components',
    //       url: '#'
    //     },
    //     {
    //       title: 'File Conventions',
    //       url: '#'
    //     },
    //     {
    //       title: 'Functions',
    //       url: '#'
    //     },
    //     {
    //       title: 'next.config.js Options',
    //       url: '#'
    //     },
    //     {
    //       title: 'CLI',
    //       url: '#'
    //     },
    //     {
    //       title: 'Edge Runtime',
    //       url: '#'
    //     }
    //   ]
    // },
    // {
    //   title: 'Architecture',
    //   url: '#',
    //   items: [
    //     {
    //       title: 'Accessibility',
    //       url: '#'
    //     },
    //     {
    //       title: 'Fast Refresh',
    //       url: '#'
    //     },
    //     {
    //       title: 'Next.js Compiler',
    //       url: '#'
    //     },
    //     {
    //       title: 'Supported Browsers',
    //       url: '#'
    //     },
    //     {
    //       title: 'Turbopack',
    //       url: '#'
    //     }
    //   ]
    // },
    // {
    //   title: 'Community',
    //   url: '#',
    //   items: [
    //     {
    //       title: 'Contribution Guide',
    //       url: '#'
    //     }
    //   ]
    // }
  ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Hospital className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Medical App</span>
                  <span className="">Fix yourself</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                          <Link to={item.url}>{item.title}</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
