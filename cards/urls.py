from django.conf.urls import patterns, include, url
from rest_framework.urlpatterns import format_suffix_patterns
from cards import views

urlpatterns = patterns('cards.views',
    url(r'^$',                          'api_root'),
    url(r'^cards/$',                    views.CardList.as_view(),       name='card-list'),
    url(r'^ranking/$',                  views.CardRanking.as_view(),    name='card-ranking'),
    url(r'^cards/(?P<pk>[0-9]+)/$',     views.CardDetail.as_view(),     name='card-detail'),
    url(r'^cards/(?P<pk>[0-9]+)/comments/$',
                                        views.CommentList.as_view(),    name='comment-list'),
    url(r'^comments/(?P<pk>[0-9]+)/$',  views.CommentDetail.as_view(),  name='comment-detail'),
    url(r'^users/$',                    views.UserList.as_view(),       name='user-list'),
    url(r'^users/(?P<pk>[0-9]+)/$',     views.UserDetail.as_view(),     name='user-detail'),
)

# Login and logout views for the browsable API
urlpatterns += patterns('',
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
)

urlpatterns = format_suffix_patterns(urlpatterns)

