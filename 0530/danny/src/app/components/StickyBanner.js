function StickyBanner() {
  return (
    <div
      id="sticky-banner"
      className="flex justify-between w-full p-4 border-b border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
    >
      <div className="flex items-center mx-auto">
        <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
          <span>Translate to Chinese</span>
        </p>
      </div>
    </div>
  );
}

export default StickyBanner;
