import { useEffect, useMemo, useState } from 'react';

export function useIsVisible(options: IntersectionObserverInit, ref: React.MutableRefObject<HTMLElement | null>) {
  const [isVisible, setIsVisible] = useState(false);

  const optionsMemo = useMemo(() => options, [options]);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const [enrtiesElement] = entries;

      if (enrtiesElement.isIntersecting) {
        return setIsVisible(true);
      }
      return setIsVisible(false);
    };

    const target = ref.current;
    const observer = new IntersectionObserver(observerCallback, optionsMemo);
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [optionsMemo, ref]);

  return isVisible;
}
