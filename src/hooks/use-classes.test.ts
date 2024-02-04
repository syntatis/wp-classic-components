import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useClasses, parsePrefixedNames } from './use-classes';

describe('parsePrefixedNames', () => {
	it('should return parse classes to be prefixed', () => {
		expect(parsePrefixedNames('test foo bar')).toEqual(['test', 'foo', 'bar']);

		expect(parsePrefixedNames(['test', 'foo', 'bar'])).toEqual([
			'test',
			'foo',
			'bar',
		]);

		expect(parsePrefixedNames(['test', 'foo', 'bar 123'])).toEqual([
			'test',
			'foo',
			'bar',
			'123',
		]);
	});
});

describe('useClasses', async () => {
	const { result } = renderHook(() => useClasses('ComponentName'));

	it('should return class with prefix', () => {
		expect(
			result.current.clsx({
				prefixedNames: 'test',
			})
		).toEqual('wp-classic-ComponentName-test');
	});

	it('should return class with prefix and the rest of class names', () => {
		expect(
			result.current.clsx({
				classNames: ['foo', { bar: true }, { abc: false }],
				prefixedNames: ['123 456', '789'],
			})
		).toEqual(
			'wp-classic-ComponentName-123 wp-classic-ComponentName-456 wp-classic-ComponentName-789 foo bar'
		);
	});
});
