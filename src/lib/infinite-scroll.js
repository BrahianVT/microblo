(function() {
    let initAttempts = 0;
    const maxAttempts = 50; // Try for ~5 seconds max
    
    const SCROLL_THRESHOLD = 300;
    const SCROLL_DEBOUNCE = 100;
    const LOADING_TIMEOUT = 250;
    const NO_MORE_POSTS_TIMEOUT = 500;

    const tryInitialize = () => {
      const itemsContainer = document.querySelector('.items');
      const beforeLink = document.querySelector('a[href*="before/"]');
      
      if (itemsContainer && beforeLink) {
        // Elements found, initialize infinite scroll
        initInfiniteScroll(itemsContainer, beforeLink);
        return true;
      }
      
      initAttempts++;
      if (initAttempts < maxAttempts) {
        // Try again in 100ms
        setTimeout(tryInitialize, 100);
      }
      return false;
    };
    
    const initInfiniteScroll = (itemsContainer, beforeLink) => {
      let isLoading = false;
      let hasMoreContent = true;
      
      const handleScroll = () => {
        const scrollPosition = window.innerHeight + window.scrollY;
        const pageHeight = document.body.offsetHeight;
        const distanceFromBottom = pageHeight - scrollPosition;
        
        if (distanceFromBottom < SCROLL_THRESHOLD && !isLoading && hasMoreContent) {
          loadMoreContent();
        }
      };
      
      const loadMoreContent = async () => {
        isLoading = true;
        
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'loading-indicator';
        loadingIndicator.textContent = 'Loading more posts...';
        loadingIndicator.style.textAlign = 'center';
        loadingIndicator.style.padding = '20px';
        itemsContainer.after(loadingIndicator);
        
        try {
          const nextPageUrl = beforeLink.getAttribute('href');
          const response = await fetch(nextPageUrl);
          
          if (!response.ok) throw new Error('Failed to load more posts');
          
          const html = await response.text();
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const newPosts = doc.querySelectorAll('.items .item');
          
          if (newPosts.length === 0) {
            hasMoreContent = false;
            loadingIndicator.textContent = 'No more posts to load';
            setTimeout(() => loadingIndicator.remove(), NO_MORE_POSTS_TIMEOUT);
            return;
          }
          
          newPosts.forEach(post => {
            itemsContainer.appendChild(document.importNode(post, true));
          });
          
          const newBeforeLink = doc.querySelector('a[href*="before/"]');
          if (newBeforeLink) {
            beforeLink.setAttribute('href', newBeforeLink.getAttribute('href'));
          } else {
            hasMoreContent = false;
            beforeLink.remove();
          }
          
          if (typeof window.applyFilter === 'function') {
            window.applyFilter();
          }
          
        } catch (error) {
          console.error('Error loading more content:', error);
          loadingIndicator.textContent = 'Error loading posts. Try again later.';
        } finally {
          isLoading = false;
          setTimeout(() => loadingIndicator.remove(), LOADING_TIMEOUT);
        }
      };
      
      // Add CSS for loading indicator
      if (!document.querySelector('#infinite-scroll-styles')) {
        const style = document.createElement('style');
        style.id = 'infinite-scroll-styles';
        style.textContent = `
          .loading-indicator {
            margin: 20px 0;
            color: #666;
            font-style: italic;
          }
        `;
        document.head.appendChild(style);
      }
      
      let scrollTimeout;
      window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(handleScroll, SCROLL_DEBOUNCE);
      });
    };
    
    // Start trying to initialize immediately
    tryInitialize();
  })();