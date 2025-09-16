console.log('Script started');

const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const theme = localStorage.getItem('theme');
const searchIcon = document.querySelector('.search-icon');
const searchForm = document.querySelector('.search-form');
const keywordExclusionDiv = document.querySelector('.keyword-exclusion');
const keywordInclusionDiv = document.querySelector('.keyword-inclusion');

// Apply theme on page load
if (theme) {
  htmlElement.classList.add(theme);
}

// dark mode
themeToggle.addEventListener('click', () => {
  htmlElement.classList.toggle('dark-mode');
  if (htmlElement.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark-mode');
  } else {
    localStorage.removeItem('theme');
  }  
});

// hide search functionality
const toggleSearchAndKeywords = () => {
  const isChecked = searchIcon?.checked;

  if (searchForm) {
    searchForm.style.display = isChecked ? 'block' : 'none';
  }

  if (keywordExclusionDiv) {
    keywordExclusionDiv.style.display = isChecked ? 'flex' : 'none';
  }

  if (keywordInclusionDiv) {
    keywordInclusionDiv.style.display = isChecked ? 'flex' : 'none';
  }
};

searchIcon.addEventListener('change', () => {
  toggleSearchAndKeywords();
});

const keywordExclusionEnabled = document.documentElement.dataset.keywordExclusionEnabled === 'true';
const keywordInclusionEnabled = document.documentElement.dataset.keywordInclusionEnabled === 'true';

let applyFilter;

if (keywordExclusionEnabled || keywordInclusionEnabled) {
  // Exclusion elements
  const excludeKeywordInput = document.getElementById('exclude-keywords');
  const applyExcludeFilterButton = document.getElementById('apply-exclude-filter');
  const clearExcludeFiltersButton = document.getElementById('clear-exclude-filters');
  
  // Inclusion elements
  const includeKeywordInput = document.getElementById('include-keywords');
  const applyIncludeFilterButton = document.getElementById('apply-include-filter');
  const clearIncludeFiltersButton = document.getElementById('clear-include-filters');

  const itemsContainer = document.querySelector('.items');

  // Get excluded keywords from localStorage
  const getExcludedKeywords = () => {
    const keywords = localStorage.getItem('excludedKeywords');
    return keywords ? keywords.split(',').map(kw => kw.trim()).filter(kw => kw.length > 0) : [];
  };

  // Save excluded keywords to localStorage
  const saveExcludedKeywords = (keywords) => {
    localStorage.setItem('excludedKeywords', keywords.join(','));
  };

  // Get included keywords from localStorage
  const getIncludedKeywords = () => {
    const keywords = localStorage.getItem('includedKeywords');
    return keywords ? keywords.split(',').map(kw => kw.trim()).filter(kw => kw.length > 0) : [];
  };

  // Save included keywords to localStorage
  const saveIncludedKeywords = (keywords) => {
    localStorage.setItem('includedKeywords', keywords.join(','));
  };

  applyFilter = () => {
    const excludedKeywords = keywordExclusionEnabled ? getExcludedKeywords() : [];
    const includedKeywords = keywordInclusionEnabled ? getIncludedKeywords() : [];
    if (!itemsContainer) return;

    const postItems = itemsContainer.querySelectorAll('.item');

    postItems.forEach(item => {
      const htmlItem = item;
      const textContent = htmlItem.textContent.toLowerCase();
      const tags = item.querySelectorAll('.tag');

      // Determine if item should be excluded
      let shouldExclude = false;

      if (keywordExclusionEnabled && excludedKeywords.length > 0) {
        for (const keyword of excludedKeywords) {
          const lowerKeyword = keyword.toLowerCase();
          if (textContent.includes(lowerKeyword)) {
            shouldExclude = true;
            break;
          }
          for (const tag of tags) {
            if (tag.textContent.toLowerCase().includes(lowerKeyword)) {
              shouldExclude = true;
              break;
            }
          }
          if (shouldExclude) break;
        }
      }

      // Determine if item should be included
      let shouldInclude = !keywordInclusionEnabled || includedKeywords.length === 0;
      if (keywordInclusionEnabled && includedKeywords.length > 0) {
        shouldInclude = false;
        for (const keyword of includedKeywords) {
          const lowerKeyword = keyword.toLowerCase();
          if (textContent.includes(lowerKeyword)) {
            shouldInclude = true;
            break;
          }
          for (const tag of tags) {
            if (tag.textContent.toLowerCase().includes(lowerKeyword)) {
              shouldInclude = true;
              break;
            }
          }
          if (shouldInclude) break;
        }
      }

      htmlItem.style.display = (shouldInclude && !shouldExclude) ? '' : 'none';
    });
  };

  // Initialize filters from localStorage
  const initFilter = () => {
    if(keywordExclusionEnabled && excludeKeywordInput) {
      const savedExcludeKeywords = getExcludedKeywords();
      excludeKeywordInput.value = savedExcludeKeywords.join(', ');
    }
    
    if(keywordInclusionEnabled && includeKeywordInput) {
      const savedIncludeKeywords = getIncludedKeywords();
      includeKeywordInput.value = savedIncludeKeywords.join(', ');
    }
    applyFilter();
  };

  // Set up exclude filter button
  if (keywordExclusionEnabled && applyExcludeFilterButton) {
    applyExcludeFilterButton.addEventListener('click', () => {
      const keywords = excludeKeywordInput.value.split(',')
        .map(kw => kw.trim()).filter(kw => kw.length > 0);
      saveExcludedKeywords(keywords);
      applyFilter();
    });
  }

  // Set up clear exclude filters button
  if (keywordExclusionEnabled && clearExcludeFiltersButton) {
    clearExcludeFiltersButton.addEventListener('click', () => {
      localStorage.removeItem('excludedKeywords');
      if (excludeKeywordInput) {
        excludeKeywordInput.value = '';
      }
      applyFilter();
    });
  }

  // Set up include filter button
  if (keywordInclusionEnabled && applyIncludeFilterButton) {
    applyIncludeFilterButton.addEventListener('click', () => {
      const keywords = includeKeywordInput.value.split(',')
        .map(kw => kw.trim()).filter(kw => kw.length > 0);
      saveIncludedKeywords(keywords);
      applyFilter();
    });
  }

  // Set up clear include filters button
  if (keywordInclusionEnabled && clearIncludeFiltersButton) {
    clearIncludeFiltersButton.addEventListener('click', () => {
      localStorage.removeItem('includedKeywords');
      if (includeKeywordInput) {
        includeKeywordInput.value = '';
      }
      applyFilter();
    });
  }  
  initFilter();
}

// Export applyFilter for use in infinite scroll
window.applyFilter = applyFilter;