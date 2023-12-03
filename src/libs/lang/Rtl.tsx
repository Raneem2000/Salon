import { FC, ReactNode } from "react";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
// import { prefixer } from "stylis";

// Create rtl cache

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});
interface Props {
  children?: ReactNode;
}

const RTL: FC<Props> = ({ children }) => {
  return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
};
export default RTL;
