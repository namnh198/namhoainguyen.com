import { visit } from 'unist-util-visit';
import slugify from 'slugify';
import { globSync } from 'glob';
import { readFileSync } from 'fs';
import { parse } from 'yaml';

export default function remarkObsidian() {
  return tree => {
    const EMBED_LINK_REGEX =
      /!\[\[([a-zA-ZÀ-ÿ0-9-'?%.():&,+/€! ]+)#?([a-zA-ZÀ-ÿ0-9-'?%.():&,+/€! ]+)?\|?([a-zA-ZÀ-ÿ0-9-'?%.():&,+/€! ]+)?\]\]/g;
    const BACK_LINK_REGEX =
      /\[\[([a-zA-ZÀ-ÿ0-9-'?%.():&,+/€! ]+)#?([a-zA-ZÀ-ÿ0-9-'?%.():&,+/€! ]+)?\|?([a-zA-ZÀ-ÿ0-9-'?%.():&,+/€! ]+)?\]\]/g;
    const YOUTUBE_REGEX = /^https:\/\/(?:www\.youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)(?:\S*)?$/;
    const HIGHLIGHT_REGEX = /==(.*)==/g;

    const markdownFolder = `${process.cwd()}/src/content/notes`;

    visit(tree, 'paragraph', node => {
      node.children = node?.children?.map(childNode => {
        let matches;
        if (childNode.type === 'text' && childNode.value.match(EMBED_LINK_REGEX)) {
          const url = childNode.value.replace(EMBED_LINK_REGEX, (_, link) => {
            return `../00-Attachments/${link}`;
          });
          childNode = {
            type: 'image',
            title: null,
            url: url.trim(),
            alt: '',
            position: childNode.position
          };
        } else if (childNode.type === 'text' && childNode.value.match(BACK_LINK_REGEX)) {
          childNode.value = childNode.value.replace(BACK_LINK_REGEX, (_, link) => {
            const href = getSlugify(link, markdownFolder);
            return `<a href="${href}" title="${link}">${link}</a>`;
          });

          childNode.type = 'html';
        }

        if (childNode.type === 'text' && childNode.value.match(HIGHLIGHT_REGEX)) {
          childNode.value = childNode.value.replace(HIGHLIGHT_REGEX, (_, highlight) => {
            return `<mark>${highlight}</mark>`;
          });

          childNode.type = 'html';
        }

        if (childNode.type === 'image' && (matches = childNode.url.match(YOUTUBE_REGEX))) {
          childNode = {
            type: 'html',
            value: `<iframe width="853" height="480" allowfullscreen title="${childNode.title}" src="https://www.youtube.com/embed/${matches[1]}"></iframe>`,
            position: childNode.position
          };
        }

        return childNode;
      });
    });

    visit(tree, 'code', node => {
      if (node.lang === 'mermaid') {
        node.type = 'html';
        node.value = `<div class="mermaid">${node.value}</div>`;
      }
    });
  };
}

const getSlugify = (title, folder) => {
  const markdownFile = globSync(`${folder}/**/${title}.{md,mdx}`);

  if (!markdownFile || markdownFile.length < 1) {
    return `/notes/${slugify(title, { lower: true })}`;
  }

  const markdown = readFileSync(markdownFile[0], 'utf8');
  const { slug } = extractFrontmatter(markdown);

  if (!slug) {
    return `/notes/${slugify(title, { lower: true })}`;
  }

  return `/notes/${slug}`;
};

const extractFrontmatter = markdown => {
  const frontmatter = markdown.match(/^---([\s\S]+?)---/);

  if (!frontmatter) return {};

  const [, frontmatterString] = frontmatter;

  return parse(frontmatterString);
};
