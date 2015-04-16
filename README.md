# fapi-oracle

Compare the HTML output of two endpoints for each front on [theguardian.com](http://www.theguardian.com/).

## Install

```
npm install -g fapi-oracle
```

## Use

```
fapi-oracle host1 host2 [options] -o output.diff
```

Example: 

```
fapi-oracle http://www.thegardian.com localhost:9000 -o out.diff
```

## Options

* `-p priority` For instance `editorial`, `commercial` or `training`. Defaults to all.
* `-l N` Limit to N fronts. e.g. `-l 5` compares the first 5 fronts.
* `--parallel N` Fetch N fronts in parallel. Defaults to 4.

## Warning

It takes a while
