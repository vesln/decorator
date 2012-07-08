TESTS = test/*.test.js
REPORTER = spec

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
	--reporter $(REPORTER) \
	$(TESTS)

browser: $(SRC)
	@node support/compile $^

clean:
	@rm -f decorator.js
	@rm -f decorator.min.js

.PHONY: test browser clean
