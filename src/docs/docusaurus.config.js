// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github")
const darkCodeTheme = require("prism-react-renderer/themes/dracula")

const tailwindPlugin = (context, options) => ({
  name: "docusaurus-tailwindcss",
  configurePostCss(postcssOptions) {
    postcssOptions.plugins.push(require("tailwindcss"))
    return postcssOptions
  },
})

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Cezerin",
  tagline: "Dinosaurs are cool",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://cezerin.org",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "Cezerin2", // Usually your GitHub org/user name.
  projectName: "Cezerin2", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/Cezerin2/Cezerin2/tree/main/src/docs/docs",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "My Site",
        logo: {
          alt: "My Site Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "Tutorial",
          },
          {
            href: "https://github.com/Cezerin2/Cezerin2",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Tutorial",
                to: "/docs/intro",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Telegram Chat: Cezerin",
                href: "https://t.me/cezerin",
              },
              {
                label: "Forum",
                href: "https://groups.google.com/g/cezerin",
              },
              {
                label: "Facebook",
                href: "https://facebook.com/cezerin",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/cezerin2",
              },
              {
                label: "Stack Overflow",
                href: "https://stackoverflow.com/questions/tagged/cezerin",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/Cezerin2/Cezerin2",
              },
              {
                label: "Demo Store - Default Theme",
                href: "https://cezerin.net",
              },
              {
                label: "Demo Store - Plusha Theme",
                href: "https://plusha.cezerin.net",
              },
              {
                label: "Demo Dashboard",
                href: "https://cezerin.net/admin",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Cezerin. This software is provided free of charge and without restriction under the <a href="https://github.com/Cezerin2/Cezerin2/blob/main/LICENSE">MIT License</a>.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),

  plugins: [tailwindPlugin],
}

module.exports = config
