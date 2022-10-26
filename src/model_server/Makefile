setup: |
	pyenv virtualenv model-server
	pyenv activate model-server
	pip install -r requirements/dev.txt

lint: |
	flake8 ./
	pylint ./
	mypy ./


tidy: |
	autoflake -ir --remove-all-unused-imports --remove-unused-variables ./
	isort ./
	black ./


pip-compile: |
	pip-compile requirements/base.in --output-file requirements.txt
	pip-compile requirements/base.in --output-file requirements/base.txt
	pip-compile requirements/base.in requirements/dev.in --output-file requirements/dev.txt