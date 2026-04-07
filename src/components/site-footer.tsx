type SiteFooterProps = {
  name: string;
};

export function SiteFooter({ name }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-zinc-800/80 pt-10 pb-2 text-center">
      <p className="text-xs leading-6 text-zinc-500">
        © {year} {name}. All rights reserved.
      </p>
    </footer>
  );
}
