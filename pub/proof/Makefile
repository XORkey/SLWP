.SUFFIXES:	.pdf .dvi .tex

.dvi.pdf:
	dvipdf $<

.tex.dvi:
	latex $< && latex $<

.aux.bbl:
	bibtex $<

vpath %.tex tex
vpath %.bib bib

LATEX_FILES		= proof.tex layout.tex macros.tex intro.tex random.tex rudimentarylogin.tex serverkeyop.tex userkeyop.tex keyring.tex initial_user_hash.sub.tex user_hash.sub.tex
BIBTEX_FILES	= proof.bib # article.bib misc.bib

proof.pdf: proof.dvi

proof.dvi: $(LATEX_FILES) proof.bbl

proof.bbl: $(BIBTEX_FILES)
