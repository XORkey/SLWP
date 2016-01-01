.SUFFIXES:	.pdf .dvi .tex

.dvi.pdf:
	dvipdf $<

.tex.dvi:
	latex $< #&& latex $<

.aux.bbl:
	bibtex $<

vpath %.tex tex
vpath %.bib tex

LATEX_FILES		= abstract.tex conclusion.tex general.tex implementation.tex introduction.tex keys.tex \
					layout.tex login.tex macros.tex security.tex slwp.tex schema.tex
BIBTEX_FILES	= article.bib misc.bib

slwp.pdf:

slwp.dvi: $(LATEX_FILES) slwp.bbl

slwp.bbl: $(BIBTEX_FILES)
