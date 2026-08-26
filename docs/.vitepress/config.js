import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "irux-router",
  description: "A lightweight client-side router for React.",
  base: "/irux-router/",

  head: [
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        href: "/irux-router/favicon.png",
      },
    ],
  ],

  themeConfig: {
    logo: "/logo.png",

    nav: [
      {
        text: "Guide",
        link: "/guide/introduction",
      },
      {
        text: "Components",
        link: "/components/router",
      },
      {
        text: "Hooks",
        link: "/hooks/use-navigate",
      },
      {
        text: "Utilities",
        link: "/utilities/create-routes",
      },
      {
        text: "Changelog",
        link: "/changelog",
      },
    ],

    sidebar: [
      {
        text: "Getting Started",
        items: [
          {
            text: "Introduction",
            link: "/guide/introduction",
          },
          {
            text: "Installation",
            link: "/guide/installation",
          },
          {
            text: "Quick Start",
            link: "/guide/quick-start",
          },
          {
            text: "Features",
            items: [
              {
                text: "Dynamic Routes",
                link: "/features/dynamic-routes",
              },
            ]
          },
          {
            text: "Components",
            items: [
              {
                text: "Router",
                link: "/components/router",
              },
              {
                text: "Route",
                link: "/components/route",
              },
              {
                text: "Link",
                link: "/components/link",
              },
              {
                text: "NotFound",
                link: "/components/not-found",
              },
            ],
          },
          {
            text: "Hooks",
            items: [
              {
                text: "useNavigate",
                link: "/hooks/use-navigate",
              },
              {
                text: "useLocation",
                link: "/hooks/use-location",
              },
              {
                text: "useParams",
                link: "/hooks/use-params",
              },
            ],
          },
          {
            text: "Utilities",
            items: [
              {
                text: "createRoutes",
                link: "/utilities/create-routes",
              },
            ],
          },
        ],
      },
    ],

    search: {
      provider: "local"
    },

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/Mohammambassam/irux-router"
      }
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2026 iruxsan"
    },

    outline: {
      level: [2, 3],
      label: "On this page"
    },

    docFooter: {
      prev: "Previous Page",
      next: "Next Page"
    },

    lastUpdated: {
      text: "Last updated"
    }
  },

  lastUpdated: true,
  cleanUrls: true
});
