import {useEffect, useRef, useState} from "react";
import './span-overflow.scss';

const SpanOverflow = ({ children }: any) => {
  const [isOverflowing, setIsOverflowing] = useState(true);
  const spanRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    const spanElement = spanRef.current;
    setIsOverflowing(spanElement.offsetWidth < spanElement.scrollWidth);
  }, []);

  return <>
    {
      isOverflowing ?
      <div className="span-overflow">
        <span className="span-tooltip">{children}</span>
        <span className="span-value" ref={spanRef}>{children}</span>
      </div> :
      <>{children}</>
    }
  </>
}

export default SpanOverflow;
