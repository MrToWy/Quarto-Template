> [!TIP]
> Full presentation with examples can be found [here](https://github.com/MrToWy/BachelorKolloquium/)

# Setup your repository
0. Consider giving this repository a star, so you can find it later in your starred repositories
1. Click on "Create a new repository"

   > [![Enable GitHub Pages][1]][1]

  [1]: enable_gh_pages.png
  

2. Enable GitHub Pages in your repository settings

   > [![Create new Repo][1]][1]

  [1]: create_new_repo.png
  
3. Edit [slides.qmd](slides.qmd) to your needs


# Install Quarto
https://quarto.org/docs/get-started/

## Render to HTML

```shell
quarto render .\slides.qmd
```

## Show preview in browser

```shell
quarto preview .\slides.qmd
```

## Open Speaker View
change to /index-speaker.html (e.g. https://mrtowy.github.io/BachelorKolloquium/slides-speaker.html)

-> Speaker View gets synchronized to normal views
