import { Link } from "wouter";
import { scrollToTop } from "@/lib/utils";

// ... other imports ...

// ... other code ...

<Link href="/residential" onClick={scrollToTop}>Residential</Link>
// ... other navigation links similarly modified ...

// ... rest of the file ...

// Placeholder for missing scrollToTop function and other components
function scrollToTop() {
  window.scrollTo({top: 0, behavior: 'smooth'});
}

// Placeholder for missing components (About, Services, Footer)
function About() {
  return <div>About Section</div>;
}

function Services() {
  return <div>Services Section</div>;
}

function Footer() {
  return <div>Footer</div>;
}

export { About, Services, Footer};