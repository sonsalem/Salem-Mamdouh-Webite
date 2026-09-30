import { type ElementType, Fragment } from "react";

const ARABIC = /[؀-ۿ]/;

/**
 * Splits text into masked words (and, for Latin text, characters) so they can
 * slide up from behind their mask. Arabic is only split into words — splitting
 * it into letters would break the joined letterforms.
 *
 * Screen readers get the plain text; the split spans are aria-hidden.
 *
 * With motion allowed, `.split-inner` starts pushed down (see globals.css) and
 * GSAP slides it up. Without the `motion` class (reduced motion / no JS) the
 * text is simply visible.
 */
const SplitText = ({
  text,
  as: Tag = "span",
  className = "",
  by = "chars",
}: {
  text: string;
  as?: ElementType;
  className?: string;
  by?: "chars" | "words";
}) => {
  const words = text.split(/\s+/).filter(Boolean);
  const arabic = ARABIC.test(text);
  const splitChars = by === "chars" && !arabic;

  return (
    <Tag className={`split ${className}`}>
      <span className="sr-only">{text}</span>
      {/* Latin text split into per-letter spans would be laid out backwards
          on an RTL page, so it's pinned to LTR. */}
      <span aria-hidden="true" dir={arabic ? undefined : "ltr"}>
        {words.map((word, w) => (
          <Fragment key={w}>
            <span className="split-mask">
              {splitChars ? (
                [...word].map((char, c) => (
                  <span key={c} className="split-inner">
                    {char}
                  </span>
                ))
              ) : (
                <span className="split-inner">{word}</span>
              )}
            </span>
            {w < words.length - 1 && " "}
          </Fragment>
        ))}
      </span>
    </Tag>
  );
};

export default SplitText;
