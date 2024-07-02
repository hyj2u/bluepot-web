import { NextSeo, NextSeoProps } from "next-seo";

interface SEOProps extends NextSeoProps {
  title?: string;
  description?: string;
  image?: string | any;
}

function SEO({ title, description, image }: SEOProps) {
  const site_url = "";
  const site_name = "통합정산시스템";
  const seo_title = title
    ? `${title ?? "통합정산시스템"} | 관리자 오신 것을 환영합니다`
    : "통합정산시스템 관리자 오신 것을 환영합니다";
  const seo_description = description
    ? description
    : "블루포트 관리자 오신 것을 환영합니다";
  const seo_images = image ? image : "";

  return (
    <NextSeo
      title={seo_title} // 영문 65자 / 한글 32자
      description={seo_description} // 영문 160 / 한글 77자
      canonical={site_url}
      openGraph={{
        type: "website",
        locale: "ko_KR",
        url: site_url,
        title: seo_title,
        description: seo_description,
        site_name: site_name,
        images: [
          {
            url: seo_images,
            alt: site_name,
          },
        ], // 16:9 , 1200px 이하
      }}
      twitter={{
        cardType: "summary_large_image", //4096x4096 이하 2:1
        handle: `@${site_name}`,
        site: site_url,
      }}
    />
  );
}

export default SEO;
