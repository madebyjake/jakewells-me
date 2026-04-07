SHELL := /bin/bash

.PHONY: install dev lint typecheck test test-coverage build check commit release release-dry export clean

install:
	pnpm install

dev:
	pnpm run dev

lint:
	pnpm run lint

typecheck:
	pnpm run typecheck

test:
	pnpm run test

test-coverage:
	pnpm run test:coverage

build:
	pnpm run build

check:
	pnpm run lint && pnpm run typecheck && pnpm run test

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
