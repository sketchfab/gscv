from django.conf.urls import patterns, url
from rest_framework.urlpatterns import format_suffix_patterns
from cards import views

urlpatterns = patterns('cards.views',
    url(r'^cards/$',                views.CardList.as_view()),
    url(r'^cards/(?P<pk>[0-9]+)/$', views.CardDetail.as_view()),
)

urlpatterns = format_suffix_patterns(urlpatterns)

