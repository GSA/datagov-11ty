---
author: admin
categories:
- arctic
- climate
excerpt: |-
  Main Page for Climate Arctic updates
link: https://www.data.gov/climate/arctic/
permalink: /climate/arctic/

pagination:
  data: collections.arctic
  size: 2
  alias: arcticposts

redirect_from:
- /arctic/

slug: climate-arctic

title: Climate — Arctic
---

{%- for post in arcticposts %}
## [{{ post.data.title }}]({{ post.url }})
{{ post.data.date }} By {{ post.data.author }}
{{ post.data.excerpt }}
{%- endfor %}


{% if pagination.href.previous %}
  <a href="{{pagination.href.previous}}">Previous Page</a>
{% endif %}
{% if pagination.href.next %}
  <a href="{{pagination.href.next}}">Next Page</a>
{% endif %}
