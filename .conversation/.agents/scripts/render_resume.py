import fitz
src = 'attached_assets/Vivekananda_Cherukupally_Resume_1790587229646.pdf'
doc = fitz.open(src)
print(f'{len(doc)} pages')
for index, page in enumerate(doc):
    target = f'.agents/outputs/resume-page-{index + 1}.png'
    page.get_pixmap(matrix=fitz.Matrix(1.25, 1.25), alpha=False).save(target)
    print(target)
