SHELL := /bin/bash

.PHONY: install dev lint typecheck build check commit release release-dry export clean

install:
	pnpm install

dev:
	pnpm run dev

lint:
	pnpm run lint

typecheck:
	pnpm run typecheck

build:
	pnpm run build

check:
	pnpm run lint && pnpm run typecheck

commit:
	pnpm run commit

release:
	pnpm run release

release-dry:
	pnpm run release:dry

export:
	STATIC_EXPORT=true pnpm run build

clean:
	rm -rf .next out
