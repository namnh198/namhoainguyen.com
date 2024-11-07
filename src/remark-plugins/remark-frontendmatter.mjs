import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';

export default function remarkCustomFrontmatter() {
  return function (tree, file) {
    // add reading time
    const textOnPage = toString(tree);
    file.data.astro.frontmatter.readingTime = Math.ceil(getReadingTime(textOnPage).minutes);

    // add post status
    const { createDate, updateDate } = file.data.astro.frontmatter;
    const currentDate = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(currentDate.getDate() - 7);

    const createDateObj = createDate ? new Date(createDate) : currentDate;
    file.data.astro.frontmatter.createLabel = 'created ' + humanDate(createDateObj);

    if (createDateObj >= sevenDaysAgo) {
      file.data.astro.frontmatter.isNew = true;
      file.data.astro.frontmatter.createLabel = 'created ' + humanDate(createDateObj);
      return;
    }

    if (updateDate) {
      const updateDateObj = new Date(updateDate);
      if (updateDateObj >= sevenDaysAgo || updateDateObj >= createDateObj) {
        file.data.astro.frontmatter.isUpdated = true;
        file.data.astro.frontmatter.updateLabel = 'updated ' + humanDate(updateDateObj);
        return;
      }
    }
  };
}

const humanDate = date => {
  const today = new Date();

  const diffTime = Math.abs(today.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 1) {
    return 'today';
  } else if (diffDays <= 2) {
    return 'yesterday';
  } else if (diffDays <= 7) {
    return `${diffDays} days ago`;
  } else if (diffDays <= 13) {
    return `${Math.floor(diffDays / 7)} week ago`;
  } else if (diffDays <= 30) {
    return `${Math.floor(diffDays / 7)} weeks ago`;
  } else if (diffDays <= 59) {
    return `${Math.floor(diffDays / 30)} month ago`;
  } else if (diffDays <= 365) {
    return `${Math.floor(diffDays / 30)} months ago`;
  } else {
    return `${Math.floor(diffDays / 365)} year ago`;
  }
};
