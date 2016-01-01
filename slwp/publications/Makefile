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
					layout.tex login.tex macros.tex security.tex slwp.tex schema.tex dummies.tex
BIBTEX_FILES	= article.bib misc.bib
SLWP_SHORT		= abstract.tex conclusion.tex introduction.tex keys.tex layout.tex login.tex macros.tex slwp_short.tex

slwp.pdf:

slwp_short.pdf:

slwp_short.dvi: $(SLWP_SHORT) slwp_short.bbl

slwp.dvi: $(LATEX_FILES) slwp.bbl

slwp.bbl: $(BIBTEX_FILES)
