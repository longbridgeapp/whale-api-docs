// @ts-check
const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')
const i18n = require('./i18n/config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const openapiDomain = 'https://open.longportapp.com'

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'LongPort OpenAPI',
  url: 'https://open.longportapp.com',
  baseUrl: '/',
  organizationName: 'longbridgeapp',
  projectName: 'whale-api-docs',
  baseUrlIssueBanner: false,
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
  i18n,
  customFields: {
    isDev: process.env.STAGE === 'dev',
  },
  favicon: 'https://pub.lbkrs.com/static/offline/202211/qohHsXzN9qtQ23ox/longport_favicon.png',
  plugins: [
    'docusaurus-plugin-sass',
    function docusaurusTailwindCss() {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss: function configurePostCss(postCssOptions) {
          postCssOptions.plugins.push(require('tailwindcss'))
          postCssOptions.plugins.push(require('autoprefixer'))
          return postCssOptions
        },
      }
    },
    function docsWebpackConfig(context, options) {
      return {
        name: 'lb-docs-webpack-plugin',
        configureWebpack(config, isServer, utils, content) {
          if (isServer) return {}
          const docsAssetPrefix = 'whale-api-docs'
          return {
            output: {
              filename: `assets/js/${docsAssetPrefix}_[name].[contenthash:8].js`,
              chunkFilename: `assets/js/${docsAssetPrefix}_[name].[contenthash:8].js`,
            },
            plugins: [
              new MiniCssExtractPlugin({
                filename: `assets/css/${docsAssetPrefix}_[name].[contenthash:8].css`,
                chunkFilename: `assets/css/${docsAssetPrefix}_[name].[contenthash:8].css`,
                ignoreOrder: true,
              }),
            ],
          }
        },
      }
    },
  ],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // todo I18n lang should redirect other dir
          editUrl: ({ locale, docPath }) => {
            const isAutoGenDoc = docPath.includes('--autogen.md')

            let nextVersionDocsDirPath = 'docs'
            if (isAutoGenDoc) {
              docPath = docPath.replace('--autogen.md', '.yml')
              nextVersionDocsDirPath = 'swagger-docs'
            }

            if (locale !== 'zh-CN') {
              let targetPath = `i18n/${locale}/docusaurus-plugin-content-docs/current/${docPath}`
              if (isAutoGenDoc) {
                targetPath = `${nextVersionDocsDirPath}/${locale}/${docPath}`
              }
              return `https://github.com/longbridgeapp/whale-api-docs/edit/main/${targetPath}`
            } else {
              if (docPath.includes('--autogen.md')) {
                docPath = docPath.replace('--autogen.md', '.yml')
                nextVersionDocsDirPath = 'swagger-docs'
              }
              return `https://github.com/longbridgeapp/whale-api-docs/edit/main/${nextVersionDocsDirPath}/${docPath}`
            }
          },
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          sidebarCollapsed: false,
          sidebarCollapsible: false,
        },
        blog: false,
        theme: {
          customCss: [require.resolve('./src/css/custom.scss')],
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [
        {
          name: 'og:image',
          content: 'https://pub.lbkrs.com/files/202205/bHQKu1TbTP5prjuH/preview.png',
        },
        {
          name: 'twitter:image',
          content: 'https://pub.lbkrs.com/files/202205/bHQKu1TbTP5prjuH/preview.png',
        },
      ],
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: '',
        logo: {
          alt: 'LongbridgeWhale',
          href: '/',
          target: '_self',
          src: 'https://assets.lbkrs.com/uploads/d29e591d-0c3d-4def-b837-cd06dfb4d738/whale-logo.svg',
        },
        items: [
          {
            to: '/',
            position: 'left',
            target: '_self',
            label: '首页',
            activeBaseRegex: '^/$',
          },
          {
            to: `/front-desk`,
            label: '产品',
            target: '_self',
            position: 'left',
          },
          {
            to: '/solutions/app-plus',
            label: '解决方案',
            position: 'left',
          },
          {
            to: '/docs',
            label: 'API',
            position: 'left',
          },
          {
            to: '/sdk',
            label: 'SDK',
            position: 'left',
          },
          {
            to: '/about',
            label: '关于我们',
            position: 'left',
          },
          {
            to: '/reports',
            label: '媒体报道',
            position: 'left',
          },

          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/longbridgeapp/whale-api-docs',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['shell-session', 'http', 'protobuf', 'rust'],
      },
    }),
}

module.exports = config
