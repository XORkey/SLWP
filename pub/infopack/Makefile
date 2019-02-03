.SUFFIXES:	.pdf .dvi .tex

.dvi.pdf:
	dvipdf $<

.tex.dvi:
	latex $< && latex $<

.aux.bbl:
	bibtex $<

#.tex.aux:
#	latex $<

vpath %.tex tex
vpath %.bib tex

LATEX_FILES		= abstract.tex conclusion.tex general.tex implementation.tex introduction.tex keys.tex \
					layout.tex login.tex macros.tex security.tex timo.tex schema.tex dummies.tex summary.tex
BIBTEX_FILES	= article.bib misc.bib

timo.pdf:

timo.dvi: $(LATEX_FILES) timo.bbl

timo.bbl: $(BIBTEX_FILES)
