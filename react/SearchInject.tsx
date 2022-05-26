import React, { ReactChildren, useEffect, useState } from 'react';

// Styles
import styles from "./styles.css";

interface SearchInjectProps {
  galleryBlockClassName: string
  injectBeforeElementNumber: number
  minimumResultsToShowAd: number
  children: ReactChildren
}

const SearchInject: StorefrontFunctionComponent<SearchInjectProps> = ({ galleryBlockClassName, injectBeforeElementNumber, minimumResultsToShowAd, children }) => {
  const [active, setActive] = useState<Boolean>(true);

  const injectAd = () => {
    console.log("Injecting Ad...");
    // @ts-expect-error
    const galleryDiv: any = document.getElementsByClassName("vtex-search-result-3-x-gallery--" + galleryBlockClassName)[0];
    const numberOfResults = galleryDiv.children.length;
    // @ts-expect-error
    const injectAd = document.getElementById("custom-search-inject");

    if (numberOfResults > minimumResultsToShowAd) {
      galleryDiv.insertBefore(injectAd, galleryDiv.children[injectBeforeElementNumber < 1 ? 0 : injectBeforeElementNumber - 1]);
    }
    if (injectAd?.parentElement?.dataset.gallery !== "true") {
      setActive(false);
    };
  }

  const waitForGallery = () => {
    console.log("Waiting For Gallery...");
    setTimeout(() => {
      // @ts-expect-error
      const galleryDiv: any = document.getElementsByClassName("vtex-search-result-3-x-gallery--" + galleryBlockClassName)[0];

      if (galleryDiv) {
        setActive(true);
        injectAd();
      } else {
        waitForGallery();
      }
    }, 500);
  }

  useEffect(() => {
    console.log("Rendering Injection Ad...");

    if (minimumResultsToShowAd <= injectBeforeElementNumber) {
      setActive(false);
      return;
    }

    // @ts-expect-error
    const galleryDiv: any = document.getElementsByClassName("vtex-search-result-3-x-gallery--" + galleryBlockClassName)[0];
    if (!galleryDiv) {
      console.log("Gallery Missing.");
      setActive(false);
      waitForGallery();
      return;
    }
    galleryDiv.dataset.gallery = true;
    setActive(true);
    injectAd();

  })

  if (active) {
    return (
      <div id="custom-search-inject" className={styles.searchInjectContainer}>{children}</div>
    )
  } else {
    return (
      <></>
    )
  }


}

SearchInject.schema = {
  title: 'Search Result Ad Injection',
  description: 'Search Result Ad Injection',
  type: 'object',
  properties: {
    injectBeforeElementNumber: {
      title: "Inject Ad Before Result Number",
      description: "Where do you want the ad to show up?",
      type: "number"
    },
    minimumResultsToShowAd: {
      title: "Minimum Results To Show Ad",
      description: "Don't show if there are fewer than this number of results. This number must be larger than where you want the ad to show, and must not be equal to.",
      type: "number"
    }
  }
}

export default SearchInject;