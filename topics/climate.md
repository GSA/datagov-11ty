---
author: admin
categories:
- arctic
- climate
- coastalflooding
- ecosystem-vulnerability
- energy-infrastructure
- foodresilience
- humanhealth
- transportation
- tribal-nations
- water
excerpt: |-
  Main Page for Climate updates
link: https://www.data.gov/climate/

pagination:
  data: collections.climate
  size: 5
  alias: posts
  reverse: true
permalink: "/climate/{% if pagination.pageNumber > 0 %}{{ pagination.pageNumber | plus: 1 }}/index.html{% endif %}"

redirect_from:
- /arctic/
- /climate/arctic/
- /climate/coastalflooding/
- /climate/ecosystem-vulnerability/
- /climate/energy-infrastructure/
- /climate/foodresilience/
- /climate/humanhealth/
- /climate/transportation/
- /climate/tribal-nations/
- /climate/water/
- /coastalflooding/
- /ecosystem-vulnerability/
- /energy-infrastructure/
- /foodresilience/
- /humanhealth/
- /transportation/
- /tribal-nations/
- /water/

slug: climate

title: Climate
---

[![CRT_Button1_Bitmap_Trans](https://data.gov/app/uploads/2014/03/CRT_Button1_Bitmap_Trans-300x118.png)](https://toolkit.climate.gov)
[![img/toolkit_coastal](/img/toolkit_coastal-300x300.jpg)](/img/toolkit_coastal.jpg)
- Explore the [Climate Resilience Toolkit](https://toolkit.climate.gov) topic area for [Coastal Flooding Risk](https://toolkit.climate.gov/topics/coastal-flood-risk).
[![img/toolkit_eco](/img/toolkit_eco-300x300.jpg)](/img/toolkit_eco.jpg)
- Explore the [Climate Resilience Toolkit](https://toolkit.climate.gov) topic area for [Ecosystem Vulnerability](https://toolkit.climate.gov/topics/ecosystem-vulnerability).
[![img/toolkit_energy](/img/toolkit_energy-300x300.jpg)](/img/toolkit_energy.jpg)
- Explore the [Climate Resilience Toolkit](https://toolkit.climate.gov/) topic area for [Energy Infrastructure](https://toolkit.climate.gov/topics/energy-supply-and-use).
[![img/toolkit_food](/img/toolkit_food-300x300.jpg)](/img/toolkit_food.jpg)
- Explore the [Climate Resilience Toolkit](https://toolkit.climate.gov/) topic area for [Food Resilience](https://toolkit.climate.gov/topics/food-resilience).
[![img/toolkit_health](/img/toolkit_health-300x300.jpg)](/img/toolkit_health.jpg)
- Explore the [Climate Resilience Toolkit](https://toolkit.climate.gov) topic area for [Human Health](https://toolkit.climate.gov/topics/human-health).
[![img/toolkit_transportation](/img/toolkit_transportation-300x300.jpg)](/img/toolkit_transportation.jpg)
- Explore the [Climate Resilience Toolkit](https://toolkit.climate.gov) topic area for [Transportation](https://toolkit.climate.gov/topics/transportation-and-supply-chain).
[![tribal_nations_icon_space](/img/tribal_icon_alt.png)](img/tribal_icon_alt.png)
- To discover how the 567 federally recognized tribes in the U.S. are addressing climate challenges and building resilience, explore the [U.S. Climate Resilience Toolkit](https://toolkit.climate.gov/) topic area for [Tribal Nations](https://toolkit.climate.gov/topics/tribal-nations).
[![img/toolkit_water](https://datagov/wordpress/2014/10/img/toolkit_water-e1429204072506.jpg)](/img/toolkit_water-e1429204072506.jpg)
- Explore the [Climate Resilience Toolkit](https://toolkit.climate.gov) topic area for [Water Resources](https://toolkit.climate.gov/topics/water-resources).



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
