# Easy setup/execution of project
SHELL=bash
.DEFAULT_GOAL := install

install: env
	.env/bin/pip install --upgrade -r requirements.txt

env: clean
	python3 -m venv .env
	.env/bin/pip install --upgrade pip setuptools wheel

clean:
	rm -rf .env
