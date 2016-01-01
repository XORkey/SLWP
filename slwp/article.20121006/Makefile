LATEX_FILES		= abstract.tex conclusion.tex hardware.tex introduction.tex keyring.tex keys.tex login.tex macros.tex software.tex webring.tex
BIBTEX_FILES	= article.bib misc.bib

webring.pdf: webring.dvi
	dvipdf $<

webring.dvi: $(LATEX_FILES) webring.bbl
	latex webring.tex

webring.bbl: webring.aux
	bibtex $<
