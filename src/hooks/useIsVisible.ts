import { useEffect, useMemo, useRef, useState } from 'react';

export function useIsVisible(options: IntersectionObserverInit) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null)

  const optionsMemo = useMemo(() => options, [options]);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const [enrtiesElement] = entries;

      if (enrtiesElement.isIntersecting) {
        return setIsVisible(true);
      }
      return setIsVisible(false);
    };

    const target = containerRef.current;
    const observer = new IntersectionObserver(observerCallback, optionsMemo);
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [optionsMemo]);

  return { isVisible, containerRef };
}
