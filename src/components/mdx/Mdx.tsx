import { MDXRemote } from 'next-mdx-remote/rsc';

const components = {
	h2: (props: React.ComponentProps<'h2'>) => (
		<h2 className="mt-12 text-3xl font-medium tracking-[-0.03em] text-[#f6f0e6]" {...props} />
	),
	p: (props: React.ComponentProps<'p'>) => <p className="mt-5" {...props} />,
	a: (props: React.ComponentProps<'a'>) => <a className="underline underline-offset-4" {...props} />,
};

export default function Mdx({ source }: { source: string }) {
	return <MDXRemote source={source} components={components} />;
}
