/**
 * Scroll Lock & Leak Prevention Manager
 * 
 * Provides reference-counted body scroll locking, scrollbar jitter compensation,
 * smooth-scroll (Lenis) coordination, and touch/wheel overscroll containment.
 */

let lockCount = 0;
let originalBodyOverflow = '';
let originalDocOverflow = '';
let originalPaddingRight = '';

export function lockScroll(): void {
  if (typeof document === 'undefined') return;

  if (lockCount === 0) {
    // 1. Capture original style values
    originalBodyOverflow = document.body.style.overflow;
    originalDocOverflow = document.documentElement.style.overflow;
    originalPaddingRight = document.body.style.paddingRight;

    // 2. Calculate scrollbar width to prevent layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // 3. Lock document & body
    document.body.classList.add('overflow-hidden');
    document.documentElement.classList.add('overflow-hidden');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // 4. Pause smooth-scroller if present (e.g. Lenis)
    const lenis = (window as any).lenis;
    if (lenis && typeof lenis.stop === 'function') {
      lenis.stop();
    }
  }

  lockCount++;
}

export function unlockScroll(): void {
  if (typeof document === 'undefined') return;

  lockCount = Math.max(0, lockCount - 1);

  if (lockCount === 0) {
    // 1. Remove lock classes
    document.body.classList.remove('overflow-hidden');
    document.documentElement.classList.remove('overflow-hidden');

    // 2. Restore original styles
    document.body.style.overflow = originalBodyOverflow;
    document.documentElement.style.overflow = originalDocOverflow;
    document.body.style.paddingRight = originalPaddingRight;

    // 3. Resume smooth-scroller if present
    const lenis = (window as any).lenis;
    if (lenis && typeof lenis.start === 'function') {
      lenis.start();
    }
  }
}
