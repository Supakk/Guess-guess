import { MDXRemote } from 'next-mdx-remote/rsc';

const components = {
	h2: (props: React.ComponentProps<'h2'>) => (
		<h2 className="mt-12 text-3xl font-medium tracking-[-0.03em] text-[#f6f0e6]" {...props} />
	),
	p: (props: React.ComponentProps<'p'>) => <p className="mt-5" {...props} />,
	a: ({ href = '', ...props }: React.ComponentProps<'a'>) => {
		const external = /^https?:/.test(href);
		return (
			<a
				className="text-[#f6f0e6] underline underline-offset-4 transition-colors duration-300 hover:text-[#c1734a]"
				href={href}
				{...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
				{...props}
			/>
		);
	},
	ul: (props: React.ComponentProps<'ul'>) => <ul className="mt-5 list-disc space-y-3 pl-5 marker:text-[#c1734a]" {...props} />,
	strong: (props: React.ComponentProps<'strong'>) => <strong className="font-medium text-[#f6f0e6]" {...props} />,
};

export default function Mdx({ source }: { source: string }) {
	return <MDXRemote source={source} components={components} />;
}
