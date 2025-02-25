// Assuming necessary imports like Link and other components are present.  This is a partial file and needs context to be complete.

// ... other code ...

function Hero({ slides, currentSlide }) {
  // ... other code ...

  return (
    // ... other JSX ...
    <Link href={`${slides[currentSlide].link}`}> {/* Corrected href construction */}
      {/* ... other JSX ... */}
      Learn More
    </Link>
    // ... other JSX ...
  );
}

// ... rest of the file ...