import type { SVGProps } from "react";
import type { SocialId } from "@/content/site";
import { FacebookIcon, InstagramIcon, TikTokIcon, YouTubeIcon, ZaloIcon } from "./brand";

const icons: Record<SocialId, (p: SVGProps<SVGSVGElement>) => React.ReactElement> = {
  facebook: FacebookIcon,
  zalo: ZaloIcon,
  tiktok: TikTokIcon,
  youtube: YouTubeIcon,
  instagram: InstagramIcon,
};

export function SocialIcon({ id, ...props }: { id: SocialId } & SVGProps<SVGSVGElement>) {
  const Icon = icons[id];
  return <Icon {...props} />;
}
