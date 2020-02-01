.SUFFIXES:	.pdf .dvi .tex

.dvi.pdf:
	dvipdf $<

.tex.dvi:
	latex $< && latex $<

.aux.bbl:
	bibtex $<

vpath %.tex tex
vpath %.bib tex

LATEX_FILES		= proof.tex
BIBTEX_FILES	= # article.bib misc.bib

proof.pdf:

proof.dvi: $(LATEX_FILES) proof.bbl

proof.bbl: $(BIBTEX_FILES)
