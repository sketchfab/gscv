from django.conf.urls import url
from cards import views

from django.conf import settings
from django.conf.urls.static import static



urlpatterns = [

    url(r'^$', views.index, name='index'),
    url(r'^cards/$', views.card_list),
    url(r'^cards/(?P<pk>[a-z]+)/$', views.card_detail),
]
