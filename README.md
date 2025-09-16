# BroadcastChannel

**Turn your Telegram Channel into a MicroBlog.**

---

English | [简体中文](./README.zh-cn.md)

## ✨ Features

- **Turn your Telegram Channel into a MicroBlog**
- **SEO friendly** `/sitemap.xml`
- **0 JS on the browser side**
- **RSS and RSS JSON** `/rss.xml` `/rss.json`

## 🪧 Demo

### Real users

- [面条实验室](https://memo.miantiao.me/)
- [Find Blog👁发现博客](https://broadcastchannel.pages.dev/)
- [Memos 广场 🎪](https://now.memobbs.app/)
- [APPDO 数字生活指南](https://mini.appdo.xyz/)
- [85.60×53.98卡粉订阅/提醒](https://tg.docofcard.com/)
- [新闻在花频道](https://tg.istore.app/)
- [ALL About RSS](https://blog.rss.tips/)
- [Charles Chin's Whisper](https://memo.eallion.com/)
- [PlayStation 新闻转发](https://playstationnews.pages.dev)
- [Yu's Life](https://daily.pseudoyu.com/)
- [Leslie 和朋友们](https://tg.imlg.co/)
- [OKHK 分享](https://tg.okhk.net/)
- [gledos 的微型博客](https://microblogging.gledos.science)
- [Steve Studio](https://tgc.surgeee.me/)
- [LiFePO4:沙雕吐槽](https://lifepo4.top)
- [Hotspot Hourly](https://hourly.top/)
- [大河马中文财经新闻分享](https://a.xiaomi318.com/)
- [\_My. Tricks 🎩 Collection](https://channel.mykeyvans.com)
- [小报童专栏精选](https://xiaobaotong.genaiprism.site/)
- [Fake news](https://fake-news.csgo.ovh/)
- [miyi23's Geekhub资源分享](https://gh.miyi23.top/)
- [Magazine｜期刊杂志｜财新周刊](https://themagazine.top)
- [Remote Jobs & Cooperation](https://share-remote-jobs.vercel.app/)
- [甬哥侃侃侃--频道发布](https://ygkkktg.pages.dev)
- [Fugoou.log](https://fugoou.xyz)
- [Bboysoul的博客](https://tg.bboy.app/)
- [MakerHunter](https://share.makerhunter.com/)
- [ChatGPT/AI新闻聚合](https://g4f.icu/)
- [Abner's memos](https://memos.abnerz6.top/)
- [Appinn Talk](https://talk.appinn.net/)
- [小报童优惠与排行榜](https://youhui.xiaobaoto.com/)

### Platform

1. [Cloudflare](https://broadcast-channel.pages.dev/)
2. [Netlify](https://broadcast-channel.netlify.app/)
3. [Vercel](https://broadcast-channel.vercel.app/)

BroadcastChannel supports deployment on serverless platforms like Cloudflare, Netlify, Vercel that support Node.js SSR, or on a VPS.
For detailed tutorials, see [Deploy your Astro site](https://docs.astro.build/en/guides/deploy/).

## 🧱 Tech Stack

- Framework: [Astro](https://astro.build/)
- CMS: [Telegram Channels](https://telegram.org/tour/channels)
- Template: [Sepia](https://github.com/Planetable/SiteTemplateSepia)

## 🏗️ Deployment

### Docker

1. `docker pull ghcr.io/ccbikai/broadcastchannel:main`
2. `docker run -d --name broadcastchannel -p 4321:4321 -e CHANNEL=miantiao_me ghcr.io/ccbikai/broadcastchannel:main`

### Serverless

1. [Fork](https://github.com/ccbikai/BroadcastChannel/fork) this project to your GitHub
2. Create a project on Cloudflare/Netlify/Vercel
3. Select the `BroadcastChannel` project and the `Astro` framework
4. Configure the environment variable `CHANNEL` with your channel name. This is the minimal configuration, for more configurations see the options below
5. Save and deploy
6. Bind a domain (optional).
7. Update code, refer to the official GitHub documentation [Syncing a fork branch from the web UI](https://docs.github.com/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork#syncing-a-fork-branch-from-the-web-ui).

## ⚒️ Configuration

```env
## Telegram Channel Username, must be configured. The string of characters following t.me/
CHANNEL=miantiao_me

## Language and timezone settings, language options see [dayjs](https://github.com/iamkun/dayjs/tree/dev/src/locale)
LOCALE=en
TIMEZONE=America/New_York

## Social media usernames
TELEGRAM=ccbikai
TWITTER=ccbikai
GITHUB=ccbikai
MASTODON=mastodon.social/@Mastodon
BLUESKY=bsky.app

## The following two social media need to be URLs
DISCORD=https://DISCORD.com
PODCAST=https://PODCAST.com

## Header and footer code injection, supports HTML
FOOTER_INJECT=FOOTER_INJECT
HEADER_INJECT=HEADER_INJECT

## SEO configuration options, can prevent search engines from indexing content
NO_FOLLOW=false
NO_INDEX=false

## Sentry configuration options, collect server-side errors
SENTRY_AUTH_TOKEN=SENTRY_AUTH_TOKEN
SENTRY_DSN=SENTRY_DSN
SENTRY_PROJECT=SENTRY_PROJECT

## Telegram host name and static resource proxy, not recommended to modify
HOST=telegram.dog
STATIC_PROXY=

## Enable Google Site Search
GOOGLE_SEARCH_SITE=memo.miantiao.me

## Enable tags page, separate tags with commas
TAGS=tag1,tag2,tag3

## Show comments
COMMENTS=true

## List of links in the Links page, Separate using commas and semicolons
LINKS=Title1,URL1;Title2,URL3;Title3,URL3;

## Sidebar Navigation Item, Separate using commas and semicolons
NAVS=Title1,URL1;Title2,URL3;Title3,URL3;

## Enable RSS beautify
RSS_BEAUTIFY=true
```

## 🙋🏻 FAQs

1. Why is the content empty after deployment?
   - Check if the channel is public, it must be public
   - The channel username is a string, not a number
   - Turn off the "Restricting Saving Content" setting in the channel
   - Redeploy after modifying environment variables
   - Telegram blocks public display of some sensitive channels, you can verify by visiting `https://t.me/s/channelusername`.

## ☕ Sponsor

1. [Follow me on Telegram](https://t.me/miantiao_me)
2. [Follow me on 𝕏](https://404.li/kai)
3. [Sponsor me on GitHub](https://github.com/sponsors/ccbikai)

Exampple response:

```json
{
    views: '1',
    id: '2',
    title: '',
    type: 'text',
    datetime: '2025-08-12T05:55:05+00:00',
    tags: [ 'test2' ],
    text: '#test2 muchas imagenes#test2 muchas imagenes',
    content: '<div class="image-list-container image-list-even">\n' +
      '      <button class="image-preview-button image-preview-wrap" popovertarget="modal-2-0" popovertargetaction="show">\n' +
      '        <img src="https://cdn1.telesco.pe/file/VJbHMftWZOo94BCBDr6svhZa0T9ZmBZLMYmrgTjXk02jZ3rpgGmZoyk_WvQvbxMADj26pmWeNRScrcNaN748lNj2t8VkRDPvIDw4f1NfP_ApMVBChhO2F32qK5SSZv0ddmvmPdrRk3PQX1ZvQVJgdocSYtBr9pSdR8dMKZrZC7yn1g7MiSf7VfPywTCJFZYIVY-UQ19JqpC-9IVdIpZdxCYeQL70xiX2bydpX8f8ppa8ahqGUT2T3h0gN9derbYG85VmcdrmZKy29kGMGchqve1OeFwBkjpi5t73-0pKZC7rzQPJZtVtkuWOwEpEmeDn6UyvU4HwQVSVolfquS1YfA.jpg" alt="" loading="lazy" />\n' +
      '      </button>\n' +
      '      <button class="image-preview-button modal" id="modal-2-0" popovertarget="modal-2-0" popovertargetaction="hide" popover>\n' +
      '        <img class="modal-img" src="https://cdn1.telesco.pe/file/VJbHMftWZOo94BCBDr6svhZa0T9ZmBZLMYmrgTjXk02jZ3rpgGmZoyk_WvQvbxMADj26pmWeNRScrcNaN748lNj2t8VkRDPvIDw4f1NfP_ApMVBChhO2F32qK5SSZv0ddmvmPdrRk3PQX1ZvQVJgdocSYtBr9pSdR8dMKZrZC7yn1g7MiSf7VfPywTCJFZYIVY-UQ19JqpC-9IVdIpZdxCYeQL70xiX2bydpX8f8ppa8ahqGUT2T3h0gN9derbYG85VmcdrmZKy29kGMGchqve1OeFwBkjpi5t73-0pKZC7rzQPJZtVtkuWOwEpEmeDn6UyvU4HwQVSVolfquS1YfA.jpg" alt="" loading="lazy" />\n' +
      '      </button>\n' +
      '    \n' +
      '      <button class="image-preview-button image-preview-wrap" popovertarget="modal-2-1" popovertargetaction="show">\n' +
      '        <img src="https://cdn1.telesco.pe/file/Xbf-vN6KvUZsug2O5v1BARGOL6evWf7UcmHZkfJ551KO5-En6yInGC2UN9wkV6wngjej3TCln7vif2ZeEb8IfVhwMJ3L0Rr496t5IIvNTYfMpEGcp0j3vp4b0yi4JVVAJxTtd5jxp3ROvjIWQnK-foxJ1bA0TBYTfkI2YF-Xh5BZ9mTLmqy94P4yIDRKQdA5XOl3fdnfxmSaxpr938oAgLYUGlAAfKoWINTLRQaIbpYq8lOr34F0HMFwEz_XXVzWWSFGbC9gaHTvU2hkGsgoeZHOhZlIqvxey7_oYIbAt2x3wyDl71sExAxtS5OOb5dd9PSNnhPG5y77K92UIx79jQ.jpg" alt="" loading="lazy" />\n' +
      '      </button>\n' +
      '      <button class="image-preview-button modal" id="modal-2-1" popovertarget="modal-2-1" popovertargetaction="hide" popover>\n' +
      '        <img class="modal-img" src="https://cdn1.telesco.pe/file/Xbf-vN6KvUZsug2O5v1BARGOL6evWf7UcmHZkfJ551KO5-En6yInGC2UN9wkV6wngjej3TCln7vif2ZeEb8IfVhwMJ3L0Rr496t5IIvNTYfMpEGcp0j3vp4b0yi4JVVAJxTtd5jxp3ROvjIWQnK-foxJ1bA0TBYTfkI2YF-Xh5BZ9mTLmqy94P4yIDRKQdA5XOl3fdnfxmSaxpr938oAgLYUGlAAfKoWINTLRQaIbpYq8lOr34F0HMFwEz_XXVzWWSFGbC9gaHTvU2hkGsgoeZHOhZlIqvxey7_oYIbAt2x3wyDl71sExAxtS5OOb5dd9PSNnhPG5y77K92UIx79jQ.jpg" alt="" loading="lazy" />\n' +
      '      </button>\n' +
      '    </div>'
  }
```