import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const routeTitles = {
  "/": "Our Team",
  "/people": "Our Team",
  "/todo": "Todo Lab",
};

const srOnlyStyle = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
};

const focusableSelectors = [
  'input[type="text"]:not([disabled])',
  'input:not([type="checkbox"]):not([type="radio"]):not([disabled])',
  "button:not([disabled])",
  "textarea:not([disabled])",
  "select:not([disabled])",
  "a[href]",
  "h1",
];

export default function AccessibilityManager() {
  const location = useLocation();
  const title = routeTitles[location.pathname] || "Home";
  const liveMessage = `${title} page loaded`;

  useEffect(() => {
    document.title = `${title} - React App`;

    const timeoutId = setTimeout(() => {
      let element = null;

      for (const selector of focusableSelectors) {
        element = document.querySelector(`main ${selector}`) || document.querySelector(selector);
        if (element) break;
      }

      if (element) {
        if (element.tagName === "H1") {
          element.setAttribute("tabindex", "-1");
          element.style.outline = "none";
        }

        element.focus({ preventScroll: true });

        requestAnimationFrame(() => {
          element.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        });
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [location.pathname, title]);

  return (
    <div
      style={srOnlyStyle}
      aria-live="assertive"
      aria-atomic="true"
    >
      {liveMessage}
    </div>
  );
}