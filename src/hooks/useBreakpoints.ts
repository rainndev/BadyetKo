import { useMediaQuery } from 'react-responsive';

const useBreakpoints = () => {
  const isSmall = useMediaQuery({ minWidth: 640 }); // sm and up
  const isMedium = useMediaQuery({ minWidth: 768 }); // md and up
  const isLarge = useMediaQuery({ minWidth: 1024 }); // lg and up
  const isXL = useMediaQuery({ minWidth: 1280 }); // xl and up
  const is2XL = useMediaQuery({ minWidth: 1536 }); // 2xl and up

  const isMobile = useMediaQuery({ maxWidth: 639 }); // below sm (mobile)
  const isTablet = useMediaQuery({ minWidth: 640, maxWidth: 1023 }); // sm to lg
  const isDesktop = useMediaQuery({ minWidth: 1024 }); // lg and up

  return {
    isMobile,
    isTablet,
    isDesktop,
    isSmall,
    isMedium,
    isLarge,
    isXL,
    is2XL,
  };
};

export default useBreakpoints;
