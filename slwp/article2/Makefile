LATEX_FILES		= abstract.tex conclusion.tex hardware.tex introduction.tex keyring.tex keys.tex \
					layout.tex login.tex macros.tex software.tex slwp.tex
BIBTEX_FILES	= article.bib misc.bib

slwp.pdf: slwp.dvi
	dvipdf $<

slwp.dvi: $(LATEX_FILES) slwp.bbl
	latex slwp.tex

slwp.bbl: slwp.aux
	bibtex $<
