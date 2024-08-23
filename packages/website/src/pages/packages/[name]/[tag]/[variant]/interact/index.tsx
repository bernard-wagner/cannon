import { ReactElement } from 'react';
import TagVariantLayout from '../_layout';
import InteractLayout from './_layout';
import { NextSeo } from 'next-seo';
import defaultSEO from '@/constants/defaultSeo';
import { getChainById } from '@/helpers/chains';
import { usePackageVersionUrlParams } from '@/hooks/routing/usePackageVersionUrlParams';

function generateMetadata({
  name,
  tag,
  chainId,
  preset,
}: {
  name: string;
  tag: string;
  chainId: number;
  preset: string;
}) {
  const chain = getChainById(chainId);

  const title = `${name} on ${chain.name}`;

  const description = `Explore the Cannon package for ${name}${
    tag !== 'latest' ? `:${tag}` : ''
  }${preset !== 'main' ? `@${preset}` : ''} on ${chain.name} (ID: ${chain.id})`;

  const metadata = {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
  return metadata;
}

export default function Interact() {
  const { name, tag, chainId, preset } = usePackageVersionUrlParams();
  const metadata = generateMetadata({
    name,
    tag,
    chainId,
    preset,
  });

  return (
    <NextSeo
      {...defaultSEO}
      title={metadata.title}
      description={metadata.description}
      openGraph={{
        ...defaultSEO.openGraph,
        title: metadata.title,
        description: metadata.description,
      }}
    />
  );
}

Interact.getLayout = function getLayout(page: ReactElement) {
  return (
    <TagVariantLayout>
      <InteractLayout>{page}</InteractLayout>
    </TagVariantLayout>
  );
};
