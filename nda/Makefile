.SUFFIXES:	.pdf .dvi .tex

.dvi.pdf:
	dvipdf $<

.tex.dvi:
	latex $<

vpath %.tex tex

nda_slwp.pdf:

nda_assessor.pdf:

nda_slwp.dvi: reviewer-date.tex reviewer-name.tex reviewer-address.tex

nda_assessor.dvi: assessor-date.tex assessor-name.tex assessor-address.tex
