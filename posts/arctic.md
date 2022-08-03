---
author: admin
categories:
- arctic
- climate
excerpt: |-
  Main Page for Climate Arctic updates
link: https://www.data.gov/climate/arctic/0.html

pagination:
  data: collections.arctic
  size: 2
  alias: posts
permalink: "/climate/arctic/{{ pagination.pageNumber }}.html"

redirect_from:
- /arctic/
- /climate/arctic

slug: climate-arctic

title: Climate — Arctic
---

{%- for post in posts %}
## [{{ post.data.title }}]({{ post.url }})
{{ post.data.date }} By {{ post.data.author }}
{{ post.data.excerpt }}
{%- endfor %}

<nav aria-labelledby="my-pagination">
  <ol>
    <li>{% if page.url != pagination.href.first %}<a href="{{ pagination.href.first }}">1</a>{% else %}1{% endif %}</li>
    <li>{% if pagination.href.previous %}<a href="{{ pagination.href.previous }}">Previous</a>{% else %}Previous{% endif %}</li>
{%- for pageEntry in pagination.pages %}
{%- endfor %}
    <li>{% if pagination.href.next %}<a href="{{ pagination.href.next }}">Next</a>{% else %}Next{% endif %}</li>
    <li>{% if page.url != pagination.href.last %}<a href="{{ pagination.href.last }}">{{pagination.pageLinks.length}}</a>{% else %}{{pagination.pageLinks.length}}{% endif %}</li>
  </ol>
</nav>
